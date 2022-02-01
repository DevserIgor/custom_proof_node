#!/bin/bash

npm install
npm run typeorm migration:run
yarn run dev