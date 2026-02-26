from schema_dictionary import SCHEMA_DICTIONARY

def get_schema_description():

    schema_text = "DATABASE: saas_bi_db\n\n"

    for table, details in SCHEMA_DICTIONARY.items():

        schema_text += f"Table: {table} ({details['business_name']})\n"

        for col, business_col in details["columns"].items():
            schema_text += f"  - {col}: {business_col}\n"

        schema_text += "\n"

    return schema_text
    