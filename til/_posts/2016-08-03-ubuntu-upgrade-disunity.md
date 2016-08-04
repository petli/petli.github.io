---
title: Ubuntu release upgrade fails outside Unity
tags:
 - ubuntu
 - do-release-upgade
 - disunity
---

Today I learnt that upgrading from Ubuntu 14.04 LTS to Ubuntu 16.04
LTS doesn't work outside non-standard desktop sessions (like 
[my i3wm/gnome hybrid]({% post_url 2015-05-03-gnome-i3wm %})).  I had
to log out, and log back in to a vanilla Unity session to get the
upgrade running.

## Symptoms

The first inkling of the problems was that Update Manager didn't
notify me about the available release upgrade.  No matter, I really
prefer command line updates and ran ```sudo do-release-upgrade```
instead.

After downloading nearly 2G of new packets it crashed with an
exception in exception handler:

    Traceback (most recent call last):
      File "/tmp/ubuntu-release-upgrader-ukrjz3_w/xenial", line 8, in <module>
      File "/tmp/ubuntu-release-upgrader-ukrjz3_w/DistUpgrade/DistUpgradeMain.py", line 242, in main
      File "/tmp/ubuntu-release-upgrader-ukrjz3_w/DistUpgrade/DistUpgradeController.py", line 1876, in run
      File "/tmp/ubuntu-release-upgrader-ukrjz3_w/DistUpgrade/DistUpgradeController.py", line 1841, in fullUpgrade
      File "/tmp/ubuntu-release-upgrader-ukrjz3_w/DistUpgrade/DistUpgradeController.py", line 1257, in doDistUpgrade
    UnboundLocalError: local variable 'e' referenced before assignment

Getting what's basically a syntax error is a sign that this is not
something that have happened during Ubuntu's testing.  That there were
no useful search results for the error messages was another bad sign.

Doing nothing to lessen my frustration the monitor also went dark
after 30s of inactivity.  Seems something in ```do-release-upgrade```
had messed with the screensaver.  This was a useful hint, though.

The upgrade log in `/var/log/dist-upgrade/main.log` provided more
hints about that this was some problem with the desktop session, just
before the traceback above:

    DEBUG killing update-notifier
    DEBUG killing kblueplugd kbluetooth4
    DEBUG killing gnome-screensaver
    DEBUG setup poke timer for the scrensaver
    DEBUG inhibit gnome-session idle
    DEBUG failed to find XDG_CURRENT_DESKTOP
    ERROR failed to inhibit gnome-session idle

That was followed by some locking issue which looks like something
in the session that was supposed to shut down didn't:

    INFO cache.commit()
    DEBUG failed to SystemUnLock() (E:Not locked) 
    ERROR IOError in cache.commit(): 'Failed to lock /var/cache/apt/archives/lock'. Retrying (currentTry: 0)
    INFO cache.commit()
    DEBUG failed to SystemUnLock() (E:Not locked) 
    ERROR IOError in cache.commit(): 'Failed to lock /var/cache/apt/archives/lock'. Retrying (currentTry: 1)
    INFO cache.commit()
    DEBUG failed to SystemUnLock() (E:Not locked) 
    ERROR IOError in cache.commit(): 'Failed to lock /var/cache/apt/archives/lock'. Retrying (currentTry: 2)
    ERROR giving up on fetching after maximum retries

And that final error turned into an exception, which triggered the
error in the exception handler.


## Solution

The only change in the system before the crash seemed to be that
`/etc/apt/sources.list` had been changed to point at xenian instead of
trusty.  It seemed somewhat safe to abandon the shell I had and log
out, logging back in using the standard Unity session instead of i3wm
in Gnome.

The first thing that happens in the Unity session is that the release
upgrade notification pops up.  Accepting the upgrade the GUI-based
process happily started, noting that all packages was already
downloaded and setting off installing them.


## Conclusion

Ubuntu doesn't test updates in non-Unity desktop environments.
