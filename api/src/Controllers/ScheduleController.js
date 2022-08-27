const ScheduleModel = require('../Models/Schedule');
const PostScheduleRequest = require('../Requests/Schedule/PostRequest');
const UpdateScheduleRequest = require('../Requests/Schedule/UpdateRequest');
const UpdateStatusRequest = require('../Requests/Schedule/UpdateStatusRequest');

class ScheduleController {
  async get(req, res) {
    let params = await req.query;

    if (params?.status === undefined) {
      params = {
        status: 'pending',
      };
    }

    const Schedule = new ScheduleModel();
    const result = await Schedule.list(params);

    res.status(result.code).json(result.message);
  }

  async post(req, res) {
    const params = await req.body;
    const validate = await PostScheduleRequest.validate(params, res);
    const Schedule = new ScheduleModel();
    const result = await Schedule.create(validate);

    res.status(result.code).json(result.message);
  }

  async put(req, res) {
    const id = req.params.id;
    const params = await req.body;
    const validate = await UpdateScheduleRequest.validate(params, res);
    const Schedule = new ScheduleModel();
    const result = await Schedule.update(validate, id);

    res.status(result.code).json(result.message);
  }

  async putStatus(req, res) {
    const id = req.params.id;
    const params = await req.body;
    const validate = await UpdateStatusRequest.validate(params, res);
    const Schedule = new ScheduleModel();
    const result = await Schedule.update(validate, id);

    res.status(result.code).json(result.message);
  }

  async delete(req, res) {
    const id = req.params.id;
    const Schedule = new ScheduleModel();
    const result = await Schedule.delete(id);

    res.status(result.code).json(result.message);
  }

  async getById(req, res) {
    const id = req.params.id;
    const Schedule = new ScheduleModel();
    const result = await Schedule.show(id);

    res.status(result.code).json(result.message);
  }
}

module.exports = ScheduleController;
