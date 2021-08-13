
ifndef mablung-makefile-environment-path
export mablung-makefile-environment-path := $(shell npx mablung-makefile-environment get-path)
endif

include $(mablung-makefile-environment-path)

ifndef current-folder

pre-build::
	$(if $(verbose),@echo update .... package.json)
	@npx mablung-makefile-environment update-package

endif