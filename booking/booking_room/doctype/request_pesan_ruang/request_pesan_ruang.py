# -*- coding: utf-8 -*-
# Copyright (c) 2019, MIS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RequestPesanRuang(Document):
	pass


	def validate(self):
		if (self.status_approve == "No" and self.docstatus == 0):
			self.status_approve = "Yes"
			
		elif (self.status_approve == "Yes" and self.docstatus == 0) : 
			self.status_approve = "Skip"
			pesan = frappe.new_doc("Pesan Ruang")
			pesan.id_member = self.id_member
			pesan.nama_member = self.nama_member
			pesan.tipe_member = self.tipe_member
			pesan.nama_ruangan = self.nama_ruangan
			pesan.booking_start = self.booking_start
			pesan.booking_end = self.booking_end
			pesan.harga = self.harga_sewa
			pesan.keterangan = self.keterangan
			pesan.nama_ruangan_ = self.nama_ruangan_
			pesan.nama_gedung = self.nama_gedung
			pesan.alSSamat_gedung = self.alamat_gedung
			pesan.save()

		elif (self.status_approve == "Yes" and self.docstatus == 1) :
			self.status_approve = "Skip"
		
			