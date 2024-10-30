{
    "connections": [
        {
            "source_ip": "192.168.0.1",
            "source_port": 8080,
            "direction": 1,
            "destination_ip": "192.168.0.6",
            "destination_port": 443,
            "application_protocol_name": "HTTPS",
            "application_confidence": 100,
            "process_name": "firefox.exe",
            "process_id": 12345,
            "server_name": "example.com",
            "http_content": "GET /",
            "bidirectional_duration_in_milliseconds": 2000,
            "bidirectional_traffic_in_bytes": 1024,
            "time": "2024-10-23T12:34:56Z"
        }
    ],
    "logs": [
        {
            "primary_key": 1,
            "source_ip": "192.168.0.1",
            "direction": 1,
            "source_port": 8080,
            "destination_ip": "192.168.0.6",
            "destination_port": 443,
            "application_protocol_name": "HTTPS",
            "application_confidence": 100,
            "process_name": "firefox.exe",
            "process_id": 12345,
            "server_name": "example.com",
            "http_content": "GET /",
            "bidirectional_duration_in_milliseconds": 2000,
            "bidirectional_traffic_in_bytes": 1024,
            "time": "2024-10-23T12:34:56Z"
        }
    ]
};
}


company-Policy List:
action : int
app_name : str
description : str
direction : int
edge_traversal : bool
edge_traversal_opt : int
enabled : bool
grouping : str
icmp_type_code : str
interfaces : list[str] or comma sep str
interface_types : list[str] or comma sep str
local_ip : list of ips or comma sep ips in str
app_package_sid : str
local_ports : list of ports or comma sep ports in str
local_user_auth_list : list of str or comma sep str
local_user_owner : str
rule_name : str
profiles : int
protocol : int
remote_ip : list of ips or comma sep ips in str
remote_mach_auth_list : list of str or comma sep str
remote_port : list of ports or comma sep ports in str
remote_user_auth_list : list of str or comma sep str
secure_flags : int
service_name : str


Endpoint-Machines Mac_address:
Sl.no (int)
MAC-address (String)


Response-saving:
username: String
mac_address: String
action : int
app_name : str
description : str
direction : int
edge_traversal : bool
edge_traversal_opt : int
enabled : bool
grouping : str
icmp_type_code : str
interfaces : list[str] or comma sep str
interface_types : list[str] or comma sep str
local_ip : list of ips or comma sep ips in str
app_package_sid : str
local_ports : list of ports or comma sep ports in str
local_user_auth_list : list of str or comma sep str
local_user_owner : str
rule_name : str
profiles : int
protocol : int
remote_ip : list of ips or comma sep ips in str
remote_mach_auth_list : list of str or comma sep str
remote_port : list of ports or comma sep ports in str
remote_user_auth_list : list of str or comma sep str
secure_flags : int
service_name : str