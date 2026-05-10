+++
date = '{{ .Date }}'
draft = false
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
slug = '{{ .File.ContentBaseName }}'
summary = ''
searchHidden = true
hiddenInRss = true
hiddenInHomeList = true
disableShare = true
ShowReadingTime = false
ShowShareButtons = false
ShowWordCount = false
showtoc = false
robotsNoIndex = true

[sitemap]
disable = true

[build]
list = 'local'
+++
