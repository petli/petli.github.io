---
title: i3wm with Gnome on Ubuntu 16.04
tags:
 - i3wm
 - gnome
 - ubuntu 16.04
 - really, what was wrong with .xinitrc?
---

After [upgrading to Ubuntu 16.04
LTS]({% post_url 2016-08-03-ubuntu-upgrade-disunity %}) my hybrid
i3wm/Gnome session broke.  gnome-panel didn't show, screen saver
didn't work, and other weird things.  Here's how to make it work.

The [i3wm/gnome configuratoin instructions
here]({% post_url 2015-05-03-gnome-i3wm %}) have been updated, so just
follow them if you are setting up a i3wm/Gnome session for the first
time.

If you already have that setup, add these two lines to
`/usr/share/xsessions/gnome-i3.desktop`:

    DesktopNames=GNOME-Flashback;Unity;
    X-Ubuntu-Gettext-Domain=gnome-flashback

It seems that in the new Gnome version there's a new configuration for
autostart in `/etc/xdg/autostart/`, where each `.desktop` file can
limit which sessions they apply to with an `OnlyShowIn` parameter.
E.g. `/etc/xdg/autostart/unity-settings-daemon.desktop`:

    [Desktop Entry]
    Type=Application
    Name=Unity Settings Daemon
    Exec=/usr/lib/unity-settings-daemon/unity-settings-daemon-localeexec
    OnlyShowIn=Unity;
    NoDisplay=true
    X-GNOME-Autostart-Phase=Initialization
    X-GNOME-Autostart-Notify=true
    X-GNOME-AutoRestart=true
    X-Ubuntu-Gettext-Domain=unity-settings-daemon

By saying that `gnome-i3.desktop` is both GNOME-Flashback and Unity
all those autostarts apply also to the i3wm setup.

(I got this trick from the [awesomewm
wiki](https://awesomewm.org/wiki/Quickly_Setting_up_Awesome_with_Gnome#Gnome_3.9_.2F_Ubuntu_13.10)
but instead of adding a desktop name for i3wm, I just copied them from
`/usr/share/xsessions/gnome-flashback-compiz.desktop`.)

