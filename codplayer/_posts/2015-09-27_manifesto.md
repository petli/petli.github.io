---
Title: A codplayer manifesto
---
If you set out, in the year of 2013, to put a lot of time and Python
and little bit of money into building a CD player you have some
explaining to do.  Here's an attempt at it.

The name, for one thing.  It's a COmplicated Disc Player, but the
short form also has the benefit of being unique, and suitably silly
for the endeavour.  Naming code is often harder than writing it.

The root goes back to a realisation that I probably should start
migrating from primarily listening to music from physical media before
it is too late.  (Not that vinyl is threatened, but I mainly collect
second hand pop record from the 80s on that format, and find it vagely
silly to buy newly pressed LPs.  The bulk of my active music
collection is on CD, and that is clearly unhip.)

At the same time I much prefer listening to pop albums, records with a
start, an end, and an internal structure.  On long travels my ipod
might get told to play random tracks, but listening to an infinite
stream of random tracks at home is not my preferred mode.  (If I want
that, I put on an [Avalanches
mix](https://www.reddit.com/r/theavalanches/comments/2zj33i/24_and_counting_of_the_avalanches_mixtapes_live/).)

iTunes does a half decent job playing albums as albums, Spotify is
just crap at it.  Neither provide any kind of user interface
equivalent of standing in front of the record shelves and deciding
what to listen on based on the physical organisation of records.  (I'm
a sucker for the physical artefact.  On the shelf there are four
copies of Pet Shop Boys "Very" on CD alone, each one bought for a very
good reason.)

The core idea of codplayer is thus to be a digital music player where
the main UI is the physical disc and a good old-fashioned remote
control, rather than having to fiddle with a laptop or touch screen
UI.

It also enables additional control by ripping the discs to files on a
hard drive, such as:

* Respecting album boundaries.  My mid-90s copy of The Rise and Fall
  of Ziggy Stardust and the Spiders From Mars has some B-sides and
  demos as bonus tracks, which are nice to have.  But after the
  closing chord to Rock'n'Roll Suicide, there should be silence, not
  John, I'm Only Dancing.  Codplayer can force the playback to pause
  there.

* Removing tracks.  Who needs a "schizo mix" of Just Can't Get Enough
  on the bonus tracks to Speak & Spell?  And while I extol the virtues
  of pop albums, there are some plainly awful tracks out there which
  are sometimes a blessing to cull.

* Symlinking discs.  Now we're into deep disc fetischism, but I
  really, really prefer to pluck the original jewel case of the shelf
  and put the original disc of Behaviour with the Helvetica typography
  in the player, while have it play the 2001 remaster.

* Getting a high-fidelity backup (not even flac! just pure samples!)
  of the record collection.

The final trigger to put these sentiments into code was that I was
about to end five years of working as a solution architect with
Microsoft Office as my main tool by joining [Commons
Machinery](http://commonsmachinery.se/) as lead developer, and feeling
a need to refresh my developer skills.  This was a suitable project
for that.  At the same time all those cheap Linux platforms were
proliferating, so it was suddenly feasible to have a small, fanless
computer in the hifi rack shuffling samples with Python code.

Thus, this is what a CD player can look like:

!(/images/codplayer/wired-boxes.jpg)

But it got better.
