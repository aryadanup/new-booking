# -*- coding: utf-8 -*-
# Copyright (c) 2019, MIS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PengembalianRuang(Document):
	pass

	def validate(self): 
		pesan = frappe.get_doc("Pesan Ruang", self.id_pesanan)
		pesan.return_time = self.waktu_kembali
		pesan.save()
		pesan.submit()
	