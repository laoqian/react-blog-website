@echo off
git add --all
set /p log=«Î ‰»Îlog:
git commit -m %log%
git push origin
