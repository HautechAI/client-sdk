#!/bin/bash

./node_modules/.bin/openapi-generator-cli generate -i https://api.dev.hautech.ai/swagger.json -g typescript-axios -o ./src/autogenerated
