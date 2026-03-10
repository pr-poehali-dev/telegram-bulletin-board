import json
import os
import psycopg2

SCHEMA = "t_p41432282_telegram_bulletin_bo"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Получение и добавление объявлений доски"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        params = event.get("queryStringParameters") or {}
        category = params.get("category")
        city = params.get("city")
        search = params.get("search")
        price_max = params.get("price_max")

        conn = get_conn()
        cur = conn.cursor()

        conditions = []
        values = []

        if category:
            conditions.append("category = %s")
            values.append(category)
        if city:
            conditions.append("city = %s")
            values.append(city)
        if search:
            conditions.append("(title ILIKE %s OR description ILIKE %s)")
            values.extend([f"%{search}%", f"%{search}%"])
        if price_max:
            try:
                conditions.append("CAST(REGEXP_REPLACE(price, '[^0-9]', '', 'g') AS BIGINT) <= %s")
                values.append(int(price_max))
            except ValueError:
                pass

        where = ("WHERE " + " AND ".join(conditions)) if conditions else ""
        query = f"SELECT id, title, description, price, city, contact, category, photo, created_at FROM {SCHEMA}.listings {where} ORDER BY created_at DESC"

        cur.execute(query, values)
        rows = cur.fetchall()
        conn.close()

        listings = [
            {
                "id": str(r[0]),
                "title": r[1],
                "description": r[2],
                "price": r[3],
                "city": r[4],
                "contact": r[5],
                "category": r[6],
                "photo": r[7],
            }
            for r in rows
        ]

        cities = list(dict.fromkeys(r[4] for r in rows))

        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"listings": listings, "cities": cities}, ensure_ascii=False),
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        title = body.get("title", "").strip()
        price = body.get("price", "").strip()
        city = body.get("city", "").strip()
        category = body.get("category", "").strip()

        if not title or not price or not city or not category:
            return {
                "statusCode": 400,
                "headers": {**CORS, "Content-Type": "application/json"},
                "body": json.dumps({"error": "Обязательные поля: title, price, city, category"}),
            }

        description = body.get("description", "")
        contact = body.get("contact", "")
        photo = body.get("photo", "")

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.listings (title, description, price, city, contact, category, photo) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (title, description, price, city, contact, category, photo),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {
            "statusCode": 201,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"id": str(new_id), "success": True}),
        }

    return {"statusCode": 405, "headers": CORS, "body": "Method Not Allowed"}
