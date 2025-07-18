class CsatSurvey < ApplicationRecord
  belongs_to :account
  belongs_to :conversation
  belongs_to :message
end
