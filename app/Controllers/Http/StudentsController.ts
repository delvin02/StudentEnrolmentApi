import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async index({ response }: HttpContextContract) {
    try {
      const students = await Student.all()
      return response.json(students)
    } catch (error) {
      return response.status(500).json({ Message: 'An error occured ' + error.Message })
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
