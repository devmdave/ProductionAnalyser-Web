from flask import Flask, render_template, request
import openpyxl
import os

app = Flask(__name__)


@app.route('/')
def dashboard():
    return render_template('index.html')

@app.route('/cycletime', methods=['GET', 'POST'])
def cycletime():
    data_dir = 'data'
    files = [f for f in os.listdir(data_dir) if f.endswith('.xlsx')]
    headers = []
    data = []
    selected_file = None

    if request.method == 'POST':
        selected_file = request.form.get('file')
        if selected_file and selected_file in files:
            workbook = openpyxl.load_workbook(os.path.join(data_dir, selected_file))
            sheet = workbook.active
            for row in sheet.iter_rows(values_only=True):
                if not headers:
                    headers = list(row)
                else:
                    data.append(list(row))

    return render_template('cycletime.html', files=files, headers=headers, data=data, selected_file=selected_file)

@app.route('/faultdelay', methods=['GET', 'POST'])
def faultdelay():
    data_dir = 'faultdelay_data'
    files = [f for f in os.listdir(data_dir) if f.endswith('.xlsx')]
    headers = []
    data = []
    selected_file = None

    if request.method == 'POST':
        selected_file = request.form.get('file')
        if selected_file and selected_file in files:
            workbook = openpyxl.load_workbook(os.path.join(data_dir, selected_file))
            sheet = workbook.active
            for row in sheet.iter_rows(values_only=True):
                if not headers:
                    headers = list(row)
                else:
                    data.append(list(row))

    return render_template('faultdelay.html', files=files, headers=headers, data=data, selected_file=selected_file)

@app.route('/tipdress', methods=['GET', 'POST'])
def tipdress():
    data_dir = 'tipdress_data'
    files = [f for f in os.listdir(data_dir) if f.endswith('.xlsx')]
    headers = []
    data = []
    selected_file = None

    if request.method == 'POST':
        selected_file = request.form.get('file')
        if selected_file and selected_file in files:
            workbook = openpyxl.load_workbook(os.path.join(data_dir, selected_file))
            sheet = workbook.active
            for row in sheet.iter_rows(values_only=True):
                if not headers:
                    headers = list(row)
                else:
                    data.append(list(row))

    return render_template('tipdress.html', files=files, headers=headers, data=data, selected_file=selected_file)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
