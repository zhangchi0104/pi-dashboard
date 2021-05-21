#!/bin/bash
diff -r backend/src/typings frontend/src/typings > /dev/null
if [ $? -ne 0 ]; then
    cp -r backend/src/typings/* frontend/src/typings/
else
    echo 'Tpyings already up-to-date'
fi