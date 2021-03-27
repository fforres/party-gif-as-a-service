## Create rolling fig

(/bin/rm roll.gif || true) && <head.png gif crop | gif roll | gif optimize --kb 127 >roll.gif

## Create wobble gif

(/bin/rm wobble.gif || true) && <head.png gif crop | gif wobble | gif optimize --kb 127 >wobble.gif

## Create shake gif

(/bin/rm shake.gif || true) && <head.png gif shake -a 28 -f 3 | gif optimize --kb 127 >shake.gif
