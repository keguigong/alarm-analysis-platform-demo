gitBranch=`git rev-parse --abbrev-ref HEAD`
gitTag=`git describe --tags --abbrev=0 HEAD | sed 's/-/./g' | tr -d 'v'`
gitHash=`git describe --always`
gitRevCount=`git rev-list --count HEAD`
gitCommitDate=`git show -s --format=%at`
buildDate=`date +%s`

version="$gitTag.$gitRevCount.$gitHash"

echo "{
  \"branch\": \"$gitBranch\",
  \"abbr_version\": \"$gitTag\",
  \"version\": \"$version\",
  \"commit_date\": $(expr $gitCommitDate \* 1000),
  \"build_date\": $(expr $buildDate \* 1000)
}" > src/assets/build-config.json