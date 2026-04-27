from groq import Groq
from schema_dictionary import SCHEMA_DICTIONARY

import os

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_schema_description():
    """Build schema with REAL column names so the model uses them correctly."""
    schema_text = "DATABASE: saas_bi_db\n\n"

    for table, details in SCHEMA_DICTIONARY.items():
        schema_text += f"Table: {table} (business name: {details['business_name']})\n"

        
        if "foreign_keys" in details:
            for fk_col, ref in details["foreign_keys"].items():
                schema_text += f"  - {fk_col} → references {ref}\n"

       
        for real_col, business_name in details["columns"].items():
            schema_text += f"  - {real_col} (meaning: {business_name})\n"

        schema_text += "\n"

    return schema_text


def generate_sql(question):
    schema = get_schema_description()

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=512,
        messages=[
            {
                "role": "system",
                "content": f"""You are a MySQL expert. Convert natural language questions to valid MySQL queries.

Use ONLY the tables and columns defined in this schema. Column names are listed as:
  - real_column_name (meaning: business_friendly_name)

You MUST use the real_column_name in your SQL, NOT the business_friendly_name.

For example:
  - Use `field1` NOT `company_name`
  - Use `table1` NOT `companies`
  - Use `ref1` NOT `company_id` (unless ref1 meaning is company_id)

Schema:
{schema}

Rules:
- Return ONLY the raw SQL query, no explanation, no markdown, no backticks
- Use ONLY real table names (table1, table2, etc.) and real column names (field1, ref1, etc.)
- Always end with a semicolon
- Use JOINs with the foreign key columns when querying across tables"""
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    return response.choices[0].message.content.strip()
