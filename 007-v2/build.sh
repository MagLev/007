# 
# build the database
#   Usage: build.sh $GEMSTONE totalNumUsers numToBuildInParallel
nohup

#create the log directory if it does not exist
if (-e log) then
  if (! -d log) then
    echo '"log" is not a directory'
    exit 1
  endif
else
  mkdir log
endif


if ($#argv != 3) then
  echo 'Usage: build $GEMSTONE totalNumUsers numToBuildInParallel'
  exit 1
endif


setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)

set totalNumUsers = $2
set numParallel   = $3


date
echo 'starting the build'
echo ' '

@ count = 0

while ($count < $totalNumUsers)
  @ subcount = 0
  while ( ($subcount < $numParallel) && ($count < $totalNumUsers))
    build_one_module.sh $GEMSTONE >& /dev/null &
    @ count += 1
    @ subcount += 1
  end

  date
  echo "waiting for $subcount topaz processes to complete their build"
  wait
  date
  echo "$subcount topaz processes have completed"
  echo ' '

end

wait

date
echo 'All topaz build processes have completed. Build Completed'

# move the shared design modules to the SharedDesignRoot array
move.sh $GEMSTONE $totalNumUsers

exit 0


