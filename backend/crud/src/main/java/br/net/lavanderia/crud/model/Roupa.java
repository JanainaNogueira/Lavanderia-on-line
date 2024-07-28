package br.net.lavanderia.crud.model;

public class Roupa {
  private String tipo;
  private int tempo;
  public Roupa () {}
  public Roupa (String tipo, int tempo) {
      this.tipo = tipo;
      this.tempo = tempo;
  }

  public String getTipo(){
      return this.tipo;
  }

  public void setTipo( String tipo){
      this.tipo = tipo;
  }

  public int getTempo(){
      return this.tempo;
  }

  public void setTempo( int tempo){
      this.tempo = tempo;
  }
}
