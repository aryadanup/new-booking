## Booking Room

MIT
=======
Uninstall Booking Apps

1. bench --site mis.training.local uninstall-app booking
2. bench remove-app booking

Installing Booking Apps

1. Masuk ke folder frappe-training
2. bench get-app https://github.com/aryadanup/new-booking.git
3. ke folder apps/ => ada folder new-booking ubah jadi booking
4. bench --site mis.training.local install-app booking
5. bench start
6. open new terminal ---> bench migrate (klo error coba bench --site mis.training.local migrate)

How to Push App

1. masuk ke dalam apps di frappe-training. contoh : opt/erpnext/frappe-training/apps/booking
2. git branch versi-(nama masing2) --> git branch versi-arya
3. git checkout versi-(nama masing2)
4. git add .
5. git commit -m "Task yang udah dikerjain"
6. git push -u versi-(nama masing2)
