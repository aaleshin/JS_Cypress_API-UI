# install node
1) brew update
   brew install node
# check node
2) node -v
   npm -v
# install Dependants
3) npm install 
# start Cypress
4) npx cypress open or npm run cy_open
# Run allure report
5) npm run report:allure


# for clearing reports
 npm run allure:clear

# for running all test
npm run cy_run:all

# for starting api test
npm run cy_run:api

# for starting ui test
npm run cy_run:ui