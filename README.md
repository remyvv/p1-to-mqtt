# P1 to MQTT

This small node.js application will read all values from the P1-port of a DSMR-based "Slimme meter" energymeter.

It reads all given values from the [p1-reader](https://github.com/ruudverheijden/node-p1-reader) library, and output them to mqtt topic split by object key. Structure: [Reading Structure](https://github.com/ruudverheijden/node-p1-reader#reading-structure)

## Enviroment variables

|Variable|Usage|Required|Default|
|---|---|---|---|
|MQTT_SERVER_URL|Server URL of the MQTT server. The URL can be on the following protocols: 'mqtt', 'mqtts', 'tcp', 'tls', 'ws', 'wss'. (e.g. `mqtt://127.0.0.1:1883`)|Yes|`mqtt://127.0.0.1:1883`|
|MQTT_TOPIC_PREFIX|Defines the prefix used for mqtt topic naming. (e.g. `p1/smartmeter`)|No|`rkvv_p1/smartmeter`|
|P1_SERIAL_PORT|The serial port device to read the DSMR meesages from. (e.g. `/dev/ttyUSB0`)|Yes||
