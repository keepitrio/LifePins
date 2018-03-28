class SmsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def text
    message = TwilioTextMessenger.new(params[:message])
    transaction = message.call(params[:phone_number])
    if transaction.account_sid
      render json: {message: "Message sent."}
    else
      render json: {message: "Unable to send message"}
    end
  end
end
