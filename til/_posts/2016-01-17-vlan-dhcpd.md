---
title: VLAN roulette with dhcpd
tags:
 - dhcpd
 - vlan
 - overly complicated home network
---

Today I learnt that if you run a Linux box as a router with a bunch of
VLANs sharing the underlying ethernet interface with untagged traffic,
you should only let dhcpd listen to requests on the VLANs.  Unless
you're a gambler, and enjoy wagering money on whether your devices on
the VLANs will get a useable address or not.


## Example

To illustrate this, assume that eth0 carries both untagged, non-VLAN
traffic, and tagged traffic for the VLAN interfaces vlan2 and vlan3.
dhcpd listens on all interfaces (eth0, vlan2 and vlan3).

When a DHCP request comes in on vlan2, dhcpd will pick it up both on
vlan2 and eth0, and might end up confusing the client with the offers
so that it ends up with an unroutable eth0 address on vlan2.  It can
look like this in `/var/log/syslog`:

    dhcpd: DHCPDISCOVER from 78:f7:be:da:59:e1 via vlan2
    dhcpd: DHCPDISCOVER from 78:f7:be:da:59:e1 via eth0
    dhcpd: DHCPOFFER on 10.10.1.104 to 78:f7:be:da:59:e1 via eth0
    dhcpd: DHCPREQUEST for 10.10.1.104 (10.10.1.1) from 78:f7:be:da:59:e1 via vlan2: wrong network.
    dhcpd: DHCPNAK on 10.10.1.104 to 78:f7:be:da:59:e1 via vlan2
    dhcpd: DHCPREQUEST for 10.10.1.104 (10.10.1.1) from 78:f7:be:da:59:e1 via eth0
    dhcpd: DHCPACK on 10.10.1.104 to 78:f7:be:da:59:e1 via eth0
    dhcpd: DHCPOFFER on 10.10.2.100 to 78:f7:be:da:59:e1 via vlan2

Quite a mess.


## Solutions

It seems like it would be possible to use ebtables to do a kind of
prefiltering on the ethernet layer to mark up the IP packets with
their VLAN tags, so that iptables filters can later use those marks to
determine whether to deliver the DHCP packets or not.

I chosed the much simpler solution: moved the devices on eth0 onto a
new VLAN, and told dhcpd to only listen on the VLAN interfaces in
`/etc/default/isc-dhcp-server`:

    INTERFACES="vlan2 vlan3 vlan4"
