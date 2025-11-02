from flask import Flask, render_template
import openpyxl

app = Flask(__name__)


@app.route('/')
def dashboard():
    return render_template('index.html')

@app.route('/cycletime')
def cycletime():
    # Load Excel data
    workbook = openpyxl.load_workbook('data/cycletime.xlsx')
    sheet = workbook.active
    data = []
    headers = []
    for row in sheet.iter_rows(values_only=True):
        if not headers:
            headers = list(row)
        else:
            data.append(list(row))
    return render_template('cycletime.html', headers=headers, data=data)

@app.route('/faultdelay')
def faultdelay():
    return render_template('faultdelay.html')

@app.route('/tipdress')
def tipdress():
    return render_template('tipdress.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
