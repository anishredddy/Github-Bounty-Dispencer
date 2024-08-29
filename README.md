

## Github Bounty Dispencer


[Demo Video](https://drive.google.com/file/d/1CVByg4IsKrLjb9maXVCdsPpS8jmqx-FX/view?usp=sharing)


 The application is designed with 100xDevs as the admin

 Admin Page is made public for the purpose of demo

 The admin can visit the admin page and create a new issue/use an existing issue and assign a bounty to it

 The user whose pull request is merged to the main branch which fixes the specific issue, can claim the bounty

 The user can go to claim section and enter his public key and claim the bounty.

 Would love for this to be the official bounty dispencer for 100xDevs

## To set up locally

 npm install -> npm run dev 

## env variables 

GITHUB_ID=O_Auth id

GITHUB_SECRET=o auth secret

NEXTAUTH_SECRET="NEXTAUTH_SECRET"

NEXTAUTH_URL=http://localhost:3000

DATABASE_URL="postgres://avnadmin:{insert your oass}@github-bounty-anishreddy56789-84f0.e.aivencloud.com:15708/defaultdb?sslmode=require"

SOLANA_PRIVATE_KEY=private key
