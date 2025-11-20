# playwright-test-framework
This a Playwright test framework for UI automation , with capability to run test cases across multiple environments , generates reports and creates screenshots for failed test cases 

Set up pre-requisites:
Install playwright
Install node


How to run the test cases ?

There are multiple ways of running a test case 
1. only sanity test cases in one environment: npx playwright test --project=ict --grep "@sanity"
2. All test cases in one environment: npx playwright test --project=ict
3. All test cases in all environment: npx playwright test 
4. Only sanity test cases in all environments: npx playwright test --grep "@sanity"

Note: If sanity tests are already executed before the full suite, you can invert the grep to skim them
"npx playwright test --grep-invert @sanity"
