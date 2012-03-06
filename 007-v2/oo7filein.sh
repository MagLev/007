#
# filein the benchmark classes.
#   Usage oo7filein.sh $GEMSTONE [small3|med3]

#create the log directory if it does not exist
if (-e log) then
  if (! -d log) then
    echo '"log" is not a directory'
    exit 1
  endif
else
  mkdir log
endif


if ($#argv != 2) then
  echo 'Usage: oo7filein.sh $GEMSTONE [small3|med3]'
  exit 1
endif

# set some variables to be used by the loadOO7.gs script
setenv $OO7sourcedir $cwd
setenv $OO7rundir $cwd
setenv $OO7configfile $OO7rundir/config$2.gs

setenv GEMSTONE $1
set path = ($path $GEMSTONE/bin)
topaz -l <<end1

output push log/oo7filein$$.out

input loadOO7.gs

output pop
end1
