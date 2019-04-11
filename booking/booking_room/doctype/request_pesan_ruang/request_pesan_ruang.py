# -*- coding: utf-8 -*-
# Copyright (c) 2019, MIS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RequestPesanRuang(Document):
	pass


	def on_submit(self):
		if(self.docstatus == 1) :
			pesan = frappe.new_doc("Pesan Ruang")
			pesan.id_member = self.id_member
			pesan.nama_member = self.nama_member
			pesan.tipe_member = self.tipe_member
			pesan.nama_ruangan = self.nama_ruangan
			pesan.booking_start = self.booking_start
			pesan.booking_end = self.booking_end
			pesan.harga = self.harga
			pesan.keterangan = self.keterangan
			pesan.save()