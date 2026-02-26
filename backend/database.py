import mysql.connector

def execute_query(sql_query):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Durga@0803",
            database="saas_bi_db"
        )

        cursor = conn.cursor(dictionary=True)
        cursor.execute(sql_query)

        if cursor.with_rows:
            results = cursor.fetchall()
        else:
            results = {"message": "Query executed successfully"}

        conn.close()
        return results

    except Exception as e:
        return {"error": str(e)}