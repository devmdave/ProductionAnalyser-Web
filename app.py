from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def dashboard():
    return render_template('index.html')

@app.route('/cycletime')
def cycletime():
    return render_template('cycletime.html')

@app.route('/faultdelay')
def faultdelay():
    return render_template('faultdelay.html')

@app.route('/tipdress')
def tipdress():
    return render_template('tipdress.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
