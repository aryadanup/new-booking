// Copyright (c) 2019, MIS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pengembalian Ruang', {
	refresh: function(frm) {

	},

	id_pesanan:function(frm){
		if (frm.doc.id_pesanan){
			frappe.call({
				method: "frappe.client.get",
				args: {
				doctype : "Pesan Ruang",
				name: frm.doc.id_pesanan
				},
				callback: function(r) {
					if(r.message) {
						
					frm.set_value('nama_member', r.message.nama_member)

					}
					frm.refresh_field('harga')
					frm.refresh_field('detail')
				}

			})
		}
	},
});
