echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@14.225.207.153:/var/www/html/
echo "Done!"
