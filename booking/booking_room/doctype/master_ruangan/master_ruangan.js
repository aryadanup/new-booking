// Copyright (c) 2019, MIS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Master Ruangan', {
	refresh: function(frm) {

	},

	tipe_ruangan:function(frm){
		if (frm.doc.tipe_ruangan){
			frappe.call({
				method: "frappe.client.get",
				args: {
				doctype : "Master Tipe Ruangan",
				name: frm.doc.tipe_ruangan
				},
				callback: function(r) {
					if(r.message) {
						var kapasitas = r.message.kapasitas
						frm.set_value('kapasitas', kapasitas)

					}
					frm.refresh_field('kapasitas')
				}

			})
		}
	},
	nama_gedung:function(frm){
		if (frm.doc.nama_gedung){
			frappe.call({
				method: "frappe.client.get",
				args: {
				doctype : "Master Gedung",
				name: frm.doc.nama_gedung
				},
				callback: function(r) {
					if(r.message) {
						var alamat = r.message.alamat_gedung
						frm.set_value('alamat_gedung', alamat)

					}
					frm.refresh_field('alamat_gedung')
				}

			})
		}
	}
});
