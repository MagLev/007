# 
nohup

if ($#argv != 3) then
  echo 'Usage: runtest.sh $GEMSTONE numUsers sleepBetweenLogins'
  exit 1
endif

setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)

set numUsers = $2
set sleepBetweenLogins = $3

@ count = 1
while ($count <= $numUsers)
  @ count = $count + 1
  runuser.sh $GEMSTONE >& /dev/null &
  sleep $sleepBetweenLogins
end

exit 0
