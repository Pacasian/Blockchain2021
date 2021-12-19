# Blockchain2021
X20217030 Blockchain Project --semester 1


# Prerequisites 
-> Visual Studio Code
-> NodeJs
-> Git

Install NodeJs
https://nodejs.org/en/download/


# Important Project URLs
GitHub Repo - https://github.com/Pacasian/Blockchain2021.git
Docker Repo - https://hub.docker.com/r/sumithkumar710/bitcoin2021

# To run this project using the Github Repo


->  Clone the Repository
    -Verify if Git is installed
        $ git version
        
    -Inside that folder, run the command to clone the repo
        $ git clone https://github.com/Pacasian/Blockchain2021.git

->  Verify if NPM and all the other dependencies are installed on the system
    -Verify/Install nodeJS
        $ node -v
    
    -Verify/Install npm
        $ npm -v
    
    -Verify/Install Dependencies in package.json file
        $ npm install <package name>
        
        
 -> Run the following .js files
    -contract.js > to connect to web3 and to Ropsten test network.
        $ node contract.js
    
    -method.js > This calls the transfer method in the erc20 contract for doing the distribution.
        $ node method.js
    
    -distribute.js > To distribute the token at a rate of 5% to each of the 10 accounts specified in the accounts.txt file.
        $ node distribute.js
    
    -handlers.js > To enable a web server, to trigger the distribution by sending a call to localhost, instead of a manual call to distribute.js inside the docker container.
        $ node handlers.js
    
    -transfer.js > To transfer the token from contract to metamask
        $ node transfer.js


