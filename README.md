# Speedy-Slide-Creator
A fast way to create multiple slides in a Google Slide presentation

Create multiple slides from text content, both title slides and body text slides.

## Instructions
- Select "Add-ons>Speedy Slide Creator>Create Slides" to open the main sidebar
- select the required template(s)
- fill in the text box with the text
- click "submit"
- Enjoy your new slides added to the end of your presentation

### How your text is used?
- Text will go onto a new slide when there is a blank line
- The first lines of a paragraph which starting a # are used for the title.
- Starting a line with a space will stop the line being seen as a title, even if the first thing after that space is a #.
- If the first line doesn't starts with a #, then no title is set for that paragraph.
- Lines not starting ith a # are seen as body text

e.g.
```
#My Title
Some fun body text

#My Title
#Second Line of this title
Some body text
and I go on two lines

I am body text without a title.
I also have multiple lines lbut dont have to

#My title
 # I start with a space so I am body text and not a title

 # I start with a space so I am body text and not a title

Some body text
#I am not at the start of the paragraph, so I am just body text and the starting # will show
some more text in the body
```

### Which template is used?
The template used is based on what text there given for a slide.
title only => title template
body only => body template
title + body => mixed template
