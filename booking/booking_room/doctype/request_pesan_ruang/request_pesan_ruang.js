
frappe.ui.form.on('Request Pesan Ruang', {
	refresh: function(frm) {
		frm.set_value('detail', "")
		if(!frm.doc.status_approve){
		frm.set_value('status_approve', "No")
		}
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
						if(status == "Eksternal"){
							frm.set_value('keterangan', 'Request untuk menyewa ruangan')
						}else {
							frm.set_value('keterangan', '')
						}
						frm.refresh_field('keterangan')

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
						frm.set_value('nama_ruangan_', r.message.nama_ruangan )
						frm.set_value('nama_gedung',  r.message.nama_gedung)
						frm.set_value('alamat_gedung', r.message.alamat_gedung)

					}
					frm.refresh_field('harga')
					frm.refresh_field('detail')
					frm.refresh_field('nama_ruangan_')
					frm.refresh_field('nama_gedung')
					frm.refresh_field('alamat_gedung')
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

});

frappe.ui.form.on("Request Pesan Ruang", "booking_end", function(frm, cdt, cdn) {
	var z = locals[cdt][cdn];

	var harga_perjam = frm.doc.harga

	if (z.booking_start && z.booking_end) {
		var total_time = frappe.datetime.get_hour_diff(z.booking_end, z.booking_start);
		if (total_time > 0 && frm.doc.tipe_member == "Eksternal") {
		var harga_total = harga_perjam * total_time
		frm.set_value('harga_sewa', harga_total)
		}else if (total_time > 0 && frm.doc.tipe_member == "Internal"){
		frm.set_value('harga_sewa', '0')
		} else {
			frm.set_value('booking_end','')
				frappe.throw(__('Waktu Tidak Valid'))
		}
	}
});