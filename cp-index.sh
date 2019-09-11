#!/bin/bash

for i in src/services/*
do
  if [ "$(basename $i)" != "search" ]
  then
    cp src/services/search/index.ts $i/index.ts
    sed -i "s/search/$(basename $i)/g" $i/index.ts
  fi
done