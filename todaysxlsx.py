from datetime import datetime

# Get today's date
today = datetime.today()

# Format the date as DD-MM-YYYY and append .xlsx
filename = today.strftime("%d-%m-%Y")+".xlsx".replace(" ", "")

# Print the filename (for example, if date is 08-11-2025, output: 08-11-2025.xlsx)
print(filename)
