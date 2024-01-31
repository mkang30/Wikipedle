# Wikipedlge

## Introduction

Wikipedle is a web-based game that involves guessing a Wikipedia article given limited information from it (more of which is revealed as you make more incorrect guesses). After guessing, the user is given a measure of how close their guess was via a report of the ‘distance’ between the guess and the solution article: this distance is the number of link clicks required to reach the target article from the guess article. If the user’s guess doesn’t correspond to an article, we suggest some articles for them to use as their guess based on Levenshtein distance between their guess and the article title. As they make more guesses, more information from the page is revealed (we’d have to be careful about not revealing sentences that contain the article title or too much information). The goal is to guess the correct article in the fewest number of guesses.  

-The project consists of Backend and Frontend parts. Refer to README in corresponding folders