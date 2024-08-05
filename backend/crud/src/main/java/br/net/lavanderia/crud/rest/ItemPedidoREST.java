package br.net.lavanderia.crud.rest;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.respository.itemPedidoRepository;

@CrossOrigin
@RestController
public class ItemPedidoREST {
  @Autowired
  private itemPedidoRepository itemPRepository;
}
