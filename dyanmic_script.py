import json
import random
import time
from mock_plc import pycomm3

plc = pycomm3()
print(plc.read_station_fault_tags())



# #Base values for parameters
# data = {
#     "cycleTime": 12.34,
#     "faultDelay": 3.21,
#     "tipDress": 5.4,
#     "efficiency": 87.6,
#     "downtime": 2.5,
#     "outputRate": 120,
#     "qualityScore": 96.7,
#     "energyConsumption": 45.8
# }

# while True:
#     # Randomize values slightly around the base
#     data["cycleTime"] = round(random.uniform(10, 15), 2)
#     data["faultDelay"] = round(random.uniform(1, 5), 2)
#     data["tipDress"] = round(random.uniform(4, 7), 1)
#     data["efficiency"] = round(random.uniform(70, 100), 1)
#     data["downtime"] = round(random.uniform(0, 10), 1)
#     data["outputRate"] = random.randint(100, 150)
#     data["qualityScore"] = round(random.uniform(90, 100), 1)
#     data["energyConsumption"] = round(random.uniform(40, 60), 1)

#     # Save to parameters.json
#     with open("parameters.json", "w") as f:
#         json.dump(data, f, indent=2)

#     print("Updated parameters.json:", data)

#     # Wait 1 second before updating again
#     time.sleep(1)
