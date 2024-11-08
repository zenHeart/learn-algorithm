#!/bin/bash
# debug bash
set -x

extract_filename() {
    echo $1 | sed -n 's/.*\/problems\/\([^\/]*\)\/description.*/\1/p'
}

get_link() {
    echo ${1%%\?*}
}

copy() {
    local problemNo=$1
    local problemName=$(extract_filename $2)
    local problemDir=$1.$problemName
    local pureLink=$(get_link $2)

    cp -r _template $problemDir
    sed -i "s/\${filename}/$problemDir/g" $problemDir/README.md
    sed -i "s|\${link}|$pureLink|g" $problemDir/README.md
}

copy $1 $2
