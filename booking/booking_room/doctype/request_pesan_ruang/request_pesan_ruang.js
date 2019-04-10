
frappe.ui.form.on('Request Pesan Ruang', {
	refresh: function(frm) {

	
	},

	id_member:function(frm){
		if (frm.doc.id_member){
			frappe.call({
				method: "frappe.client.get",
				args: {
				doctype : "Master Member Ruangan",
				name: frm.doc.id_member
				},
				callback: function(r) {
					if(r.message) {
						var nama = r.message.nama_member
						var status = r.message.tipe_member
						frm.set_value('nama_member', nama)
						frm.set_value('tipe_member', status)

					}
					frm.refresh_field('nama_member')
					frm.refresh_field('tipe_member')
				}

			})
		}
	},
	nama_ruangan:function(frm){
		if (frm.doc.nama_ruangan){
			frappe.call({
				method: "frappe.client.get",
				args: {
				doctype : "Master Ruangan",
				name: frm.doc.nama_ruangan
				},
				callback: function(r) {
					if(r.message) {
						
						var nama = r.message.nama_gedung+" ( "+r.message.nama_ruangan + " )"
						$(frm.fields_dict['detail'].wrapper).html("<img src='"+r.message.attach_image+"' height='35%' width='85%'><h5>"+nama+"</h5><p>"+r.message.alamat_gedung+"</p><p><b>Kapasitas : "+r.message.kapasitas+" Orang</b></p>")
						frm.set_value('harga', r.message.harga_sewa)

					}
					frm.refresh_field('harga')
					frm.refresh_field('detail')
				}

			})
		}
	},
	booking_start:function(frm){
		if (frm.doc.booking_start){
			if(frm.doc.booking_start < frappe.datetime.now_datetime()){
				frm.set_value('booking_start','')
				frappe.throw(__('Tidak dapat memilih tanggal terdahulu'))
			}
		frm.set_value('booking_end','')
		}
	}
	// booking_end:function(frm){
	// 	if (frm.doc.booking_end && frm.doc.booking_start) {
	// 		frappe.call({
	// 			method: "frappe.client.get",
	// 			args: {
	// 			doctype : "Pesan Ruangan",
	// 			name: frm.doc.nama_ruangan
	// 			},
	// 			callback: function(r) {
	// 				if(r.message) {
						
	// 					var nama = r.message.nama_gedung+" ( "+r.message.nama_ruangan + " )"
	// 					$(frm.fields_dict['detail'].wrapper).html("<img src='"+r.message.attach_image+"' height='35%' width='85%'><h5>"+nama+"</h5><p>"+r.message.alamat_gedung+"</p><p><b>Kapasitas : "+r.message.kapasitas+" Orang</b></p>")
	// 					frm.set_value('harga', r.message.harga_sewa)

	// 				}
	// 				frm.refresh_field('harga')
	// 				frm.refresh_field('detail')
	// 			}

	// 		})

	// 	}
	// }
	
});

frappe.ui.form.on("Request Pesan Ruang", "booking_end", function(frm, cdt, cdn) {
	var z = locals[cdt][cdn];

	if(z.booking_start && z.booking_end) {
		var total_time = frappe.datetime.get_hour_diff(z.booking_end, z.booking_start);
		var harga_total = frm.doc.harga * total_time
		frm.set_value('harga', harga_total)
	}
});