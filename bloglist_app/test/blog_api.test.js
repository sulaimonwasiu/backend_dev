/* eslint-disable no-undef */
//const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const dB = require('../db')


const expect = chai.expect

chai.use(chaiHttp)

describe('blog application', () => {

  beforeEach( async () => {
    await dB.connect()
  })

  after(async () => {
    await dB.disConnect()
  })

  describe('returning blogs correctly', () => {
    it('notes are returned as json',  async () => {
      const res = await chai.request(app).get('/api/blogs')
      console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.greaterThan(0)
    })
  
  
  })
  
})



