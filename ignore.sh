#!/bin/bash

bash -c 'if [[ $VERCEL_GIT_COMMIT_REF != "stream-data" ]]; then exit 1; fi'