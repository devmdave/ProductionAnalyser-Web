
import os
import io
import pandas as pd
from flask import Flask, render_template, send_file

app = Flask(__name__)

def read_excel_data(folder):
    """Reads all Excel files from a folder and combines them into a single DataFrame."""
    all_data = []
    if not os.path.exists(folder):
        os.makedirs(folder)
    for filename in os.listdir(folder):
        if filename.endswith((".xlsx", ".xls")):
            filepath = os.path.join(folder, filename)
            try:
                df = pd.read_excel(filepath)
                all_data.append(df)
            except Exception as e:
                print(f"Error reading {filename}: {e}")
    if not all_data:
        return pd.DataFrame()
    return pd.concat(all_data, ignore_index=True)

def prepare_table_data(df):
    """Converts a DataFrame into a dictionary suitable for rendering in a template."""
    if df.empty:
        return {'columns': [], 'data': []}
    return {
        'columns': df.columns.tolist(),
        'data': df.values.tolist()
    }

@app.route("/")
def index():
    return render_template('dashboard.html')

@app.route("/fault-delay")
def fault_delay():
    df = read_excel_data("faultdelay")
    table_data = prepare_table_data(df)
    return render_template('fault_delay.html', table=table_data)

@app.route("/cycle-time")
def cycle_time():
    df = read_excel_data("cycletime")
    table_data = prepare_table_data(df)
    return render_template('cycle_time.html', table=table_data)

@app.route("/tip-dress")
def tip_dress():
    df = read_excel_data("tipdress")
    table_data = prepare_table_data(df)
    return render_template('tip_dress.html', table=table_data)

@app.route("/download/<category>")
def download_data(category):
    """Downloads the combined data for a category as a CSV file."""
    folder_map = {
        "faultdelay": "faultdelay",
        "cycletime": "cycletime",
        "tipdress": "tipdress",
    }
    folder = folder_map.get(category)
    if not folder:
        return "Invalid category", 404

    df = read_excel_data(folder)
    if df.empty:
        return "No data available to download.", 404

    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)

    return send_file(
        io.BytesIO(csv_buffer.read().encode('utf-8')),
        mimetype='text/csv',
        as_attachment=True,
        download_name=f'{category}_data.csv'
    )

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
