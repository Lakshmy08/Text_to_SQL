import mysql.connector

def setup_database():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Durga@0803"
        )

        cursor = conn.cursor()

        print("Connected to MySQL")

        
        cursor.execute("CREATE DATABASE IF NOT EXISTS saas_bi_db;")
        print("Database created")

        cursor.execute("USE saas_bi_db;")
        print("Using database")

        
        with open("schema.sql", "r", encoding="utf-8") as f:
            schema_sql = f.read()

        for statement in schema_sql.split(";"):
            if statement.strip():
                try:
                    cursor.execute(statement)
                except Exception as e:
                    print("Schema error:", e)

        print("Schema executed")

       
        with open("seed_data.sql", "r", encoding="utf-8") as f:
            seed_sql = f.read()

        for statement in seed_sql.split(";"):
            if statement.strip():
                try:
                    cursor.execute(statement)
                except Exception as e:
                    print("Seed error:", e)

        conn.commit()
        print("Data inserted")

        conn.close()
        print("Done successfully")

    except Exception as e:
        print("Connection error:", e)

if __name__ == "__main__":
    setup_database()
