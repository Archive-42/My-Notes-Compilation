Common

## IP, Hostnames, DNS

### Valid IPs

```
^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$
```

To match IPs without anchors use this pattern instead

```
(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}
```

since many regex engine match the first possibility in the | sequence.

Test sample:

```
Proxy IP Proxy Port Last Check Proxy Speed Proxy Country Anonymity 118.99.81.204118.99.81.204 8080 34 sec Indonesia - Tangerang Transparent 2.184.31.2 8080 58 sec Iran Transparent 93.126.11.189 8080 1 min Iran - Esfahan Transparent 202.118.236.130 7777 1 min China - Harbin Transparent 62.201.207.9 8080 1 min Iraq Transparent 219.143.244.170 8899 1 min China - Beijing Transparent 66.63.235.97 8080 1 min United States - Somerville Transparent 27.191.194.106 8080 1 min China Transparent 200.195.141.178 8080 2 min Brazil Transparent 210.101.131.232 8080 2 min South Korea - Seoul Transparent 218.75.205.44 9999 2 min China - Changsha Transparent212.119.97.198 3128 2 min Russia - Moscow Transparent
10.48.0.200

10.48.0.200
10.48.0.190
10.48.0.255
10.48.0.232
10.48.0.020

Your public IP address is 46.130.14.41 - Learn more
```

### Valid Hostname

```
^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$
```

Valid as per [RFC 1123](http://tools.ietf.org/html/rfc1123)
