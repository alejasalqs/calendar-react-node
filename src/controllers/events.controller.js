const EventModel = require("../models/Event.model");

const getAllEvents = async (req, res) => {
  // COn el metodod populate traemos la info de los usuarios desde el evento
  const events = await EventModel.find().populate("user", "name"); // Si no hay parametros trae todos los eventos
  return res.json({
    ok: true,
    events,
  });
};

const createNewEvent = async (req, res) => {
  try {
    const event = new EventModel(req.body);
    event.user = req.user.uid;

    const savedEvent = await event.save();

    console.log(req.body);
    return res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    //console.log(error.stack);
    return res.status(500).json({
      ok: false,
      msg: "Error saving event",
      error: {
        name: error.name,
        number: error.number,
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    // Se obtiene el valor que viene en los parametros
    const eventID = req.params.id;
    const reqUid = req.user.uid;

    const event = await EventModel.findById(eventID);

    // Se valida que el evento exista
    if (!event) {
      return res.status(404).json({
        ok: false,
        error: `There is no event with id: ${eventID}`,
      });
    }

    if (event.user.toString() !== reqUid) {
      return res.status(401).json({
        ok: false,
        error: `You can not update this event`,
      });
    }

    const newEvent = {
      ...req.body,
      user: reqUid,
    };

    // Usamos findByIdAndUpdate para actualziar el evento
    // Regresa por defecto el evento sin actualizar
    // Para obtener el nuevo hay que mandar el 3 paramentro con la configuracion
    const updatedEvent = await EventModel.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });

    return res.json({
      ok: true,
      event: updateEvent,
    });
  } catch (error) {
    //console.log(error.stack);
    return res.status(500).json({
      ok: false,
      msg: "Error saving event",
      error: {
        name: error.name,
        number: error.number,
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    // Se obtiene el valor que viene en los parametros
    const eventID = req.params.id;
    const reqUid = req.user.uid;

    const event = await EventModel.findById(eventID);

    // Se valida que el evento exista
    if (!event) {
      return res.status(404).json({
        ok: false,
        error: `There is no event with id: ${eventID}`,
      });
    }

    if (event.user.toString() !== reqUid) {
      return res.status(401).json({
        ok: false,
        error: `You can not update this event`,
      });
    }

    // Usamos findByIdAndDelete para eliminar el evento
    const deletedEvent = await EventModel.findByIdAndDelete(eventID, {});

    return res.json({
      ok: true,
      event: deletedEvent,
    });
  } catch (error) {
    //console.log(error.stack);
    return res.status(500).json({
      ok: false,
      msg: "Error saving event",
      error: {
        name: error.name,
        number: error.number,
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

module.exports = {
  getAllEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
